export type TTrip = {
    destination: string;
    description:string;
    travelType:string;
    startDate: string; 
    endDate: string; 
    budget: number;
    activities: string[];
};


export type TTripFilterRequest = {
    destination?: string | undefined;
    minBudget?: string | undefined;
    maxBudget?: string | undefined;
    startDate?: string | undefined;
    endDate?: string | undefined;
    searchTerm?: string | undefined;
}