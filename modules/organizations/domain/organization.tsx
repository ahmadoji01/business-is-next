import { ORG_STATUS } from "./organizations.constants"

interface Logo {
	id: string,
	filename_download: string,
}

export interface Organization {
    id: number,
    name: string,
    type: string,
    subscription_type: string,
    subscription_expiry: Date,
    domain_name: string,
    slug: string,
    logo: Logo|null,
    status: string,
    tax_rate: number,
}

export const defaultOrganization:Organization = {
    id: 0,
    name: "",
    type: "",
    subscription_type: "",
    subscription_expiry: new Date,
    domain_name: "",
    slug: "",
    logo: null,
    status: ORG_STATUS.close,
    tax_rate: 0,
}

export function organizationMapper(res:Record<string,any>) {
    let organization = defaultOrganization;
    organization = { 
        id: res.id,
        name: res.name,
        type: res.type? res.type : "",
        subscription_type: res.subscription_type,
        subscription_expiry: new Date,
        domain_name: res.domain_name? res.domain_name : "",
        slug: res.slug? res.slug : "",
        logo: res.logo? res.logo : null,
        status: res.status? res.status : ORG_STATUS.close,
        tax_rate: res.tax_rate? res.tax_rate : 0,
    }
    return organization;
}

export type OrganizationPatcher = Omit<Organization, 'subscription_type'|'subscription_expiry'|'domain_name'|'slug'|'status'|'logo'|'type'>;
export function organizationPatcherMapper(organization:Organization) {

    let organizationPatcher: OrganizationPatcher = {
        id: organization.id,
        name: organization.name,
        tax_rate: organization.tax_rate? organization.tax_rate : 0,
    }
    return organizationPatcher;
}