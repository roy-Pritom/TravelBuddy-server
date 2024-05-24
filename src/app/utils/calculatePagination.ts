type TOptions = {
    page?: number,
    limit?: number,
    skip?: number,
    sortBy?: string,
    sortOrder?: string
}
type TOptionsResult = {
    limit: number,
    skip: number,
    page: number,
    sortBy: string,
    sortOrder: string
}
const calculatePagination = (options:TOptions):TOptionsResult => {
    const page: number = Number(options.page) || 1;
    const limit: number = Number(options.limit) || 10;
    const skip = (page - 1) * limit;

    const sortBy: string = options.sortBy || 'createdAt'
    const sortOrder: string = options.sortOrder || 'desc'

    return {
        limit,
        skip,
        sortBy,
        sortOrder,
        page
    }
}

export default calculatePagination;