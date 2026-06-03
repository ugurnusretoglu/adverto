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

export interface loginType {
    username: string,
    password: string
}

export interface logoutType {
    refreshToken: string
}

export interface authenticateResponse {
    payload: {
        accessToken: string,
        refreshToken: string;
    }
    status: number;
}

export interface advertType {
    advertNumber: String,
    advertName: String,
    price: number,
    description: string,
    adStatus: string;
}

export interface vehicleTypeIU extends advertType {
    vehicleType: string,
    brand: string,
    series?: string,
    model?: string,
    modelYear: number,
    fuelType: string,
    transmissionType: string,
    bodyType: string,
    mileage?: number,
    driveType: string,
    color: string,
    severeDamageRecord: boolean,
    plateNo: string;
}

export interface engineType {
    engineType?: string;
    engineDisplacement?: number;
    maxPower?: string;
    maxTorque?: string;
    zeroToHundredAcceleration?: number;
    topSpeed?: number;
}

export interface fuelConsumptionType {
    cityConsumption?: number;
    highwayConsumption?: number;
    averageConsumption?: number;
    fuelTankCapacity?: number;
}

export interface vehicleType {
    id: number;
    advertNumber: string;
    advertName: string;
    price: number;
    description: string;
    adStatus: string;
    vehicleType: string;
    brand: string;
    series?: string;
    model?: string;
    modelYear: number;
    fuelType: string;
    transmissionType: string;
    bodyType: string;
    mileage?: number;
    driveType?: string;
    color: string;
    severeDamageRecord: boolean;
    plateNo?: string;
    images: { id: number; url: string }[];
    engine?: engineType;
    fuelConsumption?: fuelConsumptionType;
}

export interface ApiResponse<T> {
    payload: T;
    status: number;
}

export interface addressType {
    country: string;
    city: string;
    district: string;
    street: string;
}

export interface estateTypeIU extends advertType {
    dtoAddress: addressType;
}

export interface houseTypeIU extends estateTypeIU {
    totalArea: number;
    netArea: number;
    rooms?: string;
    age?: number;
    floor?: string;
    totolFloors?: number;
    heating?: string;
    bathrooms?: number;
    kitchen?: string;
    balcony?: boolean;
    elevator?: boolean;
}

export interface landTypeIU extends estateTypeIU {
    landUse?: string;
    squareMeter: number;
    pricePerSquareMeter?: number;
    blockNo?: string;
    parcelNo?: string;
    sheetNo?: string;
    far?: number;
    heightLimit?: number;
}

export interface estateType {
    id: number;
    advertNumber: string;
    advertName: string;
    price: number;
    description: string;
    adStatus: string;
    dtoAddress: addressType;
    images: { id: number; url: string }[];
}

export interface houseType extends estateType {
    totalArea: number;
    netArea: number;
    rooms?: string;
    age?: number;
    floor?: string;
    totolFloors?: number;
    heating?: string;
    bathrooms?: number;
    kitchen?: string;
    balcony?: boolean;
    elevator?: boolean;
}

export interface landType extends estateType {
    landUse?: string;
    squareMeter: number;
    pricePerSquareMeter?: number;
    blockNo?: string;
    parcelNo?: string;
    sheetNo?: string;
    far?: number;
    heightLimit?: number;
}