export interface registerType {
    firstName: string,
    lastName: string,
    username: string,
    birthOfDate: string | null,
    password: string,
    phone: string,
    email: string,
    address: {
        country: string,
        city: string,
        district: string,
        street: string
    }
}

export interface formType {
    firstName: string,
    lastName: string,
    username: string,
    birthOfDate: Date | null,
    password: string,
    phone: string,
    email: string,
    address: {
        country: string,
        city: string,
        district: string,
        street: string
    }
}