import { errorMapper } from '@/modules/errors/domains/error';
import { Organization, defaultOrganization, organizationMapper } from '@/modules/organizations/domain/organization';
import { getOrganization } from '@/modules/organizations/domain/organizations.actions';
import { User, defaultUser, userMapper } from '@/modules/users/domain/user';
import { getUserMe } from '@/modules/users/domain/users.actions';
import { directusClient, websocketClient } from '@/utils/request-handler';
import { WebSocketClient } from '@directus/sdk';
import { useRouter, usePathname } from 'next/navigation';
import { Dispatch, SetStateAction, createContext, useContext, useEffect, useState } from 'react';

interface UserContextType {
    accessToken: string,
    user: User,
    loading: boolean,
    organization: Organization,
    fontSize: string,
    wsClient: WebSocketClient<any>|undefined,
    setUser: Dispatch<SetStateAction<User>>,
    setOrganization: Dispatch<SetStateAction<Organization>>,
    setFontSize: Dispatch<SetStateAction<string>>,
    setAccessToken: Dispatch<SetStateAction<string>>,
    setWSClient: Dispatch<SetStateAction<WebSocketClient<any>|undefined>>,
    setLoading: Dispatch<SetStateAction<boolean>>,
    fetchOrganization: () => void,
    signOut: () => void,
}

let EXPIRY_MS = 1000;

export const UserContext = createContext<UserContextType | null>({
    accessToken: "",
    user: defaultUser,
    loading: false,
    organization: defaultOrganization,
    fontSize: "100%",
    wsClient: websocketClient(""),
    setUser: () => {},
    setOrganization: () => {},
    setFontSize: () => {},
    setAccessToken: () => {},
    setWSClient: () => {},
    setLoading: () => {},
    fetchOrganization: () => {},
    signOut: () => {},
});
 
export const UserProvider = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const pathname = usePathname();
    const userField = ['id', 'email', 'first_name', 'last_name', 'role.name', 'avatar.id', 'avatar.filename_download'];
    const orgField = ['id', 'email', 'phone', 'address', 'name', 'subscription_type', 'subscription_expiry', 'status', 'logo.id', 'logo.filename_download'];
    const [accessToken, setAccessToken] = useState<string>("");
    const [expiry, setExpiry] = useState(50);
    const [user, setUser] = useState(defaultUser);
    const [loading, setLoading] = useState(true);
    const [fontSize, setFontSize] = useState("100%");
    const [organization, setOrganization] = useState(defaultOrganization);
    const [size, setSize] = useState("100% !important");
    const [wsClient, setWSClient] = useState<WebSocketClient<any>>();
  
    useEffect(() => {
      let localSize = localStorage.getItem("font-size");
      if (localSize !== null) {
        setSize(localSize);
      }
      document.body.style.fontFamily = 'Satoshi';
    }, [])
  
    useEffect(() => {
      document.body.style.fontSize = size;
    }, [size]);

    const signOut = () => {
        directusClient.logout().then( () => {
            setAccessToken('');
            window.location.assign('/auth/login');
        });
    }

    const connectWS = (token:string) => {
        let client = websocketClient(token);
        setWSClient(client);
        client.connect();
    }

    const refreshToken = async (interval:NodeJS.Timeout, isLooping:boolean) => {
        let isError = false;
        
        if (accessToken === "")
            isError = true;

        if (!isError) {
            await getUserMe(accessToken, userField).then(res => {
                let usr = defaultUser;
                usr = userMapper(res);
                setUser(usr);
                setLoading(false);
                return;
            }).catch( () => {
                isError = true;
                setLoading(false);
                return;
            });

            getOrganization(accessToken, 1, orgField).then( res => {
                if (res.length < 1) {
                    return;
                }
                setOrganization(organizationMapper(res[0]));
            }).catch( err => {
                isError = true;
                setLoading(false);
                return;
            });
        }
        
        if (!isError) {
            connectWS(accessToken);
            return;
        }

        await directusClient.refresh().then( (res) => {
            if (res.access_token === null) {
                window.location.assign("/auth/login");
                return;
            }
            let token = res.access_token? res.access_token : '';
            let expiry = res.expires? res.expires : 0;
            setAccessToken(token);
            setExpiry(expiry);
            getUserMe(token).then(res => {
                let usr = defaultUser;
                usr = userMapper(res);
                setUser(usr);
            }).catch( () => {
                if (pathname !== '/') {
                    window.location.assign("/auth/login");
                }
                return;
            });
            connectWS(token);
            getOrganization(token, 1, orgField).then( res => {
                if (res.length < 1) {
                    return;
                }
                setOrganization(organizationMapper(res[0]));
            }).catch( err => {
                isError = true;
                setLoading(false);
                return;
            });
            setLoading(false);
            if (!isLooping)
                clearInterval(interval);
            return;
        }).catch( err => {
            console.log(err.errors[0]);
            let e = errorMapper(err.errors[0]);
            if (!pathname?.includes('auth/login') && ( e.code === "INVALID_PAYLOAD" || err?.response?.status === 401 || err?.response?.status === 403)) {
                window.location.href = '/auth/login';
            }
            setLoading(false);
            clearInterval(interval);
            return; 
        });
    }

    const fetchOrganization = () => {
        getOrganization(accessToken, 1).then( res => {
            if (res.length < 1) {
                return;
            }
            setOrganization(organizationMapper(res[0]));
        }).catch( () => {})
    }

    useEffect(() => {
        if (loading === false)
            return;

        let interval = setInterval(async () => {
            refreshToken(interval, false);
            clearInterval(interval);
        }, 100);

        return () => clearInterval(interval);    
    }, []);

    useEffect(() => {
        let interval = setInterval(async () => {
            refreshToken(interval, true);
        }, 900000);

        return () => clearInterval(interval);    
    }, []);
    
    useEffect(() => {
        if (user.role_name === "") {
            return;
        }
    }, [pathname]);

    useEffect(() => {
        if (user.role_name === "") {
            return;
        }
    }, [user.role_name])

    return (
        <UserContext.Provider value={{ wsClient, setWSClient, signOut, accessToken, setAccessToken, user, setUser, organization, setOrganization, loading, setLoading, fontSize, setFontSize, fetchOrganization }}>
            {children}
        </UserContext.Provider>
    );
};
 
export const useUserContext = () => {
    const context = useContext(UserContext);
    
    if (!context) {
        throw new Error('useThemeContext must be used inside the UserProvider');
    }
    
    return context;
};