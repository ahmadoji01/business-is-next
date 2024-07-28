import { ROLES } from "@/modules/users/domain/users.constants";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { faCashRegister, faChartPie, faClinicMedical, faClipboard, faCreditCard, faDashboard, faFileImport, faFileMedical, faHospitalUser, faLinesLeaning, faNewspaper, faNoteSticky, faPerson, faPills, faPrescription, faPrescriptionBottle, faScaleBalanced, faSyringe, faTimes, faUser, faUserDoctor, faUserInjured, faUserLock, faUsers, faUsersBetweenLines } from "@fortawesome/free-solid-svg-icons";

interface SubMenuItem {
    title: string,
    url: string,
}

interface MenuItem {
    title: string,
    allowedRole: string[],
    icon: IconProp,
    url: string,
    subMenu: SubMenuItem[],
}

interface MenuGroup {
    headerTitle: string,
    allowedRole: string[],
    menuItems: MenuItem[],
}

export interface SideMenuItem {
    role: string,
    menuGroup: MenuGroup[],
}

export interface UserMenuItem {
    title: string,
    icon: IconProp,
    url: string,
    role: string[]
}

interface HomeMenu {
    image: string,
    title: string,
    url: string,
}

export interface HomeMenuItem {
    role: string,
    homeMenus: HomeMenu[],
}

export const userMenuItems: UserMenuItem[] = [
    {
        title: "menu.my_profile",
        icon: faUser,
        url: "/profile",
        role: [ROLES.administrator, ROLES.apothecary, ROLES.cashier, ROLES.doctor, ROLES.receptionist, ROLES.staff, ROLES.front_desk]
    },
    {
        title: "menu.dashboard",
        icon: faDashboard,
        url: "/dashboard",
        role: [ROLES.administrator, ROLES.apothecary]
    },
    {
        title: "menu.queue_manager",
        icon: faUsersBetweenLines,
        url: "/operational/front-desk/queue-manager",
        role: [ROLES.administrator, ROLES.front_desk]
    },
    {
        title: "menu.queue_display",
        icon: faLinesLeaning,
        url: "/operational/front-desk/queue-display",
        role: [ROLES.administrator, ROLES.cashier]
    },
    {
        title: "patient_registration",
        icon: faClipboard,
        url: "/operational/front-desk/patient-registration",
        role: [ROLES.administrator, ROLES.front_desk]
    },
    {
        title: "clinic_status",
        icon: faClinicMedical,
        url: "/operational/front-desk",
        role: [ROLES.administrator, ROLES.front_desk]
    },
    {
        title: "menu.patients_list",
        icon: faUserInjured,
        url: "/operational/doctor/patients-list",
        role: [ROLES.administrator, ROLES.doctor]
    },
    {
        title: "manage_cashier",
        icon: faCashRegister,
        url: "/cashier",
        role: [ROLES.administrator, ROLES.cashier]
    }
]

export const sideMenuItems: SideMenuItem[] = [
    {
        role: ROLES.administrator,
        menuGroup: [
            {
                headerTitle: "menu.patient_header",
                allowedRole: [ROLES.administrator],
                menuItems: [
                    {
                        title: "menu.patient_data",
                        allowedRole: [ROLES.administrator],
                        icon: faUserInjured,
                        url: "patients",
                        subMenu: [ 
                            { title: "menu.all_patients", url: "patients" }, 
                            { title: "menu.add_patient", url: "patients/create" } 
                        ],
                    },
                    {
                        title: "menu.visits",
                        allowedRole: [ROLES.administrator],
                        icon: faHospitalUser,
                        url: "visits",
                        subMenu: [],
                    },
                ],
            },
            {
                headerTitle: "menu.record_header",
                allowedRole: [ROLES.administrator, ROLES.doctor],
                menuItems: [
                    {
                        title: "menu.medical_records",
                        allowedRole: [ROLES.administrator, ROLES.doctor],
                        icon: faFileMedical,
                        url: "medical-records",
                        subMenu: [],
                    },
                    {
                        title: "menu.submit_to_satusehat",
                        allowedRole: [ROLES.administrator, ROLES.doctor],
                        icon: faFileImport,
                        url: "submit-record",
                        subMenu: [],
                    },
                ],
            },
            {
                headerTitle: "menu.clinic_header",
                allowedRole: [ROLES.administrator, ROLES.staff, ROLES.cashier],
                menuItems: [
                    {
                        title: "menu.clinic_analysis",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faChartPie,
                        url: "analysis",
                        subMenu: [],
                    },
                    {
                        title: "menu.account_management",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faUser,
                        url: "accounts",
                        subMenu: [ 
                            { title: "menu.all_users", url: "accounts" }, 
                            { title: "menu.add_user", url: "accounts/create" } 
                        ],
                    },
                    {
                        title: "doctors",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faUserDoctor,
                        url: "doctors",
                        subMenu: [ 
                            { title: "menu.all_doctors", url: "doctors" }, 
                            { title: "menu.add_doctor", url: "accounts/create?role=Doctor" } 
                        ],
                    },
                    {
                        title: "staffs",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faPerson,
                        url: "staffs",
                        subMenu: [ 
                            { title: "menu.all_staffs", url: "staffs" }, 
                            { title: "menu.add_staff", url: "accounts/create?role=Staff" } 
                        ],
                    },
                    {
                        title: "treatments",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faSyringe,
                        url: "treatments",
                        subMenu: [ 
                            { title: "menu.all_treatments", url: "treatments" }, 
                            { title: "menu.add_treatment", url: "treatments/create" } 
                        ],
                    },
                    {
                        title: "medicines",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faPills,
                        url: "medicines",
                        subMenu: [ 
                            { title: "menu.all_medicines", url: "medicines" }, 
                            { title: "menu.add_medicine", url: "medicines/create" }, 
                            { title: "medicine_categories", url: "medicines/category" } 
                        ],
                    },
                    {
                        title: "order_history",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faCashRegister,
                        url: "orders",
                        subMenu: [],
                    },
                ],
            },
            {
                headerTitle: "menu.settings_header",
                allowedRole: [ROLES.administrator, ROLES.staff],
                menuItems: [
                    {
                        title: "menu.tax_and_administrations",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faNoteSticky,
                        url: "administration",
                        subMenu: [],
                    },
                    {
                        title: "menu.subscription",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faNewspaper,
                        url: "subscription",
                        subMenu: [],
                    },
                    {
                        title: "payment_methods",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faCreditCard,
                        url: "payment-methods",
                        subMenu: [],
                    },
                    {
                        title: "satusehat_integration",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faPrescription,
                        url: "satusehat-settings",
                        subMenu: [],
                    },
                    {
                        title: "bpjs_integration",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faPrescriptionBottle,
                        url: "bpjs-settings",
                        subMenu: [],
                    },
                    {
                        title: "menu.privacy_policy",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faUserLock,
                        url: "../info/privacy-policy",
                        subMenu: [],
                    },
                    {
                        title: "menu.terms_and_conditions",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faScaleBalanced,
                        url: "../info/terms-and-conditions",
                        subMenu: [],
                    },
                ],
            },
        ]
    },
    {
        role: ROLES.cashier,
        menuGroup: [
            {
                headerTitle: "menu.clinic_header",
                allowedRole: [ROLES.administrator, ROLES.staff, ROLES.cashier],
                menuItems: [
                    {
                        title: "menu.clinic_analysis",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faChartPie,
                        url: "analysis",
                        subMenu: [],
                    },
                    {
                        title: "treatments",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faSyringe,
                        url: "treatments",
                        subMenu: [ 
                            { title: "menu.all_treatments", url: "treatments" }, 
                            { title: "menu.add_treatment", url: "treatments/create" } 
                        ],
                    },
                    {
                        title: "medicines",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faPills,
                        url: "medicines",
                        subMenu: [ 
                            { title: "menu.all_medicines", url: "medicines" }, 
                            { title: "menu.add_medicine", url: "medicines/create" }, 
                            { title: "medicine_categories", url: "medicines/category" } 
                        ],
                    },
                    {
                        title: "order_history",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faCashRegister,
                        url: "orders",
                        subMenu: [],
                    },
                ],
            },
            {
                headerTitle: "menu.settings_header",
                allowedRole: [ROLES.administrator, ROLES.staff],
                menuItems: [
                    {
                        title: "menu.tax_and_administrations",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faNoteSticky,
                        url: "administration",
                        subMenu: [],
                    },
                    {
                        title: "menu.subscription",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faNewspaper,
                        url: "subscription",
                        subMenu: [],
                    },
                    {
                        title: "payment_methods",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faCreditCard,
                        url: "payment-methods",
                        subMenu: [],
                    },
                    {
                        title: "menu.privacy_policy",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faUserLock,
                        url: "../info/privacy-policy",
                        subMenu: [],
                    },
                    {
                        title: "menu.terms_and_conditions",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faScaleBalanced,
                        url: "../info/terms-and-conditions",
                        subMenu: [],
                    },
                ],
            },
        ]
    },
    {
        role: ROLES.front_desk,
        menuGroup: [
            {
                headerTitle: "menu.patient_header",
                allowedRole: [ROLES.administrator],
                menuItems: [
                    {
                        title: "menu.patient_data",
                        allowedRole: [ROLES.administrator],
                        icon: faUserInjured,
                        url: "patients",
                        subMenu: [ 
                            { title: "menu.all_patients", url: "patients" }, 
                            { title: "menu.add_patient", url: "patients/create" } 
                        ],
                    },
                    {
                        title: "menu.visits",
                        allowedRole: [ROLES.administrator],
                        icon: faHospitalUser,
                        url: "visits",
                        subMenu: [],
                    },
                ],
            },
            {
                headerTitle: "menu.record_header",
                allowedRole: [ROLES.administrator, ROLES.doctor],
                menuItems: [
                    {
                        title: "menu.medical_records",
                        allowedRole: [ROLES.administrator, ROLES.doctor],
                        icon: faFileMedical,
                        url: "medical-records",
                        subMenu: [],
                    },
                    {
                        title: "menu.submit_to_satusehat",
                        allowedRole: [ROLES.administrator, ROLES.doctor],
                        icon: faFileImport,
                        url: "submit-record",
                        subMenu: [],
                    },
                ],
            },
            {
                headerTitle: "menu.clinic_header",
                allowedRole: [ROLES.administrator, ROLES.staff, ROLES.cashier],
                menuItems: [
                    {
                        title: "menu.clinic_analysis",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faChartPie,
                        url: "analysis",
                        subMenu: [],
                    },
                    {
                        title: "order_history",
                        allowedRole: [ROLES.administrator, ROLES.staff],
                        icon: faCashRegister,
                        url: "orders",
                        subMenu: [],
                    },
                ],
            },
        ]
    },
    {
        role: ROLES.doctor,
        menuGroup: [
            {
                headerTitle: "menu.patient_header",
                allowedRole: [ROLES.administrator],
                menuItems: [
                    {
                        title: "menu.patient_data",
                        allowedRole: [ROLES.administrator],
                        icon: faUserInjured,
                        url: "patients",
                        subMenu: [ 
                            { title: "menu.all_patients", url: "patients" }, 
                            { title: "menu.add_patient", url: "patients/create" } 
                        ],
                    },
                    {
                        title: "menu.visits",
                        allowedRole: [ROLES.administrator],
                        icon: faHospitalUser,
                        url: "visits",
                        subMenu: [],
                    },
                ],
            },
            {
                headerTitle: "menu.record_header",
                allowedRole: [ROLES.administrator, ROLES.doctor],
                menuItems: [
                    {
                        title: "menu.medical_records",
                        allowedRole: [ROLES.administrator, ROLES.doctor],
                        icon: faFileMedical,
                        url: "medical-records",
                        subMenu: [],
                    },
                    {
                        title: "menu.submit_to_satusehat",
                        allowedRole: [ROLES.administrator, ROLES.doctor],
                        icon: faFileImport,
                        url: "submit-record",
                        subMenu: [],
                    },
                ],
            },
        ]
    },
]

export const homeMenuItems: HomeMenuItem[] = [
    {
        role: ROLES.administrator,
        homeMenus: [
            {
                image: '/icons/menu/order.png',
                title: 'home_menu.print_sales',
                url: '/dashboard/orders',
            },
            {
                image: '/icons/menu/queue-manager.png',
                title: 'home_menu.manage_queue',
                url: '/operational/front-desk/queue-manager',
            },
            {
                image: '/icons/menu/queue-display.png',
                title: 'home_menu.display_queue',
                url: '/operational/front-desk/queue-display',
            },
            {
                image: '/icons/menu/patient-registration.png',
                title: 'home_menu.patient_registration',
                url: '/operational/front-desk/patient-registration',
            },
            {
                image: '/icons/menu/examine.png',
                title: 'home_menu.examine_patient',
                url: '/operational/doctor/patients-list',
            },
            {
                image: '/icons/menu/profile.png',
                title: 'home_menu.edit_profile',
                url: '/profile',
            },
            {
                image: '/icons/menu/cashier.png',
                title: 'home_menu.manage_cashier',
                url: '/cashier',
            },
            {
                image: '/icons/menu/treatment.png',
                title: 'home_menu.add_treatment',
                url: '/dashboard/treatments/create',
            },
            {
                image: '/icons/menu/medicine.png',
                title: 'home_menu.add_medicine',
                url: '/dashboard/medicines/create',
            },
            {
                image: '/icons/menu/open.png',
                title: 'home_menu.open_close_clinic',
                url: '/operational/front-desk',
            },
            {
                image: '/icons/menu/analysis.png',
                title: 'home_menu.clinic_analysis',
                url: '/dashboard/analysis',
            }
        ]
    },
    {
        role: ROLES.front_desk,
        homeMenus: [
            {
                image: '/icons/menu/queue-manager.png',
                title: 'home_menu.manage_queue',
                url: '/operational/front-desk/queue-manager',
            },
            {
                image: '/icons/menu/queue-display.png',
                title: 'home_menu.display_queue',
                url: '/operational/front-desk/queue-display',
            },
            {
                image: '/icons/menu/patient-registration.png',
                title: 'home_menu.patient_registration',
                url: '/operational/front-desk/patient-registration',
            },
            {
                image: '/icons/menu/profile.png',
                title: 'home_menu.edit_profile',
                url: '/profile',
            },
            {
                image: '/icons/menu/open.png',
                title: 'home_menu.open_close_clinic',
                url: '/operational/front-desk',
            }
        ]
    },
    {
        role: ROLES.doctor,
        homeMenus: [
            {
                image: '/icons/menu/examine.png',
                title: 'home_menu.examine_patient',
                url: '/operational/doctor/patients-list',
            },
            {
                image: '/icons/menu/profile.png',
                title: 'home_menu.edit_profile',
                url: '/profile',
            }
        ]
    },
    {
        role: ROLES.cashier,
        homeMenus: [
            {
                image: '/icons/menu/order.png',
                title: 'home_menu.print_sales',
                url: '/dashboard/orders',
            },
            {
                image: '/icons/menu/profile.png',
                title: 'home_menu.edit_profile',
                url: '/profile',
            },
            {
                image: '/icons/menu/cashier.png',
                title: 'home_menu.manage_cashier',
                url: '/cashier',
            },
            {
                image: '/icons/menu/analysis.png',
                title: 'home_menu.clinic_analysis',
                url: '/dashboard/analysis',
            }
        ]
    }
]