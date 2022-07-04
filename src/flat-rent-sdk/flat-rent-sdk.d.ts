// declare module 'flat-rent-sdk' {

//сделала отдельно этот интерфейс, т.к. в database и в результате _formatFlatObject возвращается объект в такими же св-вами, кроме  price (меняется на totalPrice)
interface IDefaultDatabase {
  id: string,
  title: string,
  details: string,
  photos: string[],
  coordinates: number[],
  bookedDates: Date[],
}

interface IDatabase extends IDefaultDatabase {
  price: number
}

export const database: IDatabase[]

//нужно для _formatFlatObject
interface IFormattedDatabase extends IDefaultDatabase {
  totalPrice: number
}

export function cloneDate(date: Date): Date
export function addDays(date: Date, days: number): Date

export const backendPort: number
export const localStorageKey: string


interface IParameters {
  city: string,
  checkInDate: Date,
  checkOutDate: Date,
  priceLimit: number
}

export class FlatRentSdk {
  get(id: string): Promise<Object | null>;

  // search(parameters: IParameters): IFormattedDatabase[];

  search(parameters: IParameters): Promise<IFormattedDatabase[] | null>;


  book(flatId: number, checkInDate: Date, checkOutDate: Date): number


  _assertDatesAreCorrect(checkInDate: Date, checkOutDate: Date): void

  _resetTime(date: Date): void

  _calculateDifferenceInDays(startDate: Date, endDate: Date): number

  _generateDateRange(from: Date, to: Date): Date[]

  _generateTransactionId(): number

  _areAllDatesAvailable(flat: IDatabase, dateRange: Date[]): boolean


  _formatFlatObject(flat: IDatabase, nightNumber: number): IFormattedDatabase

  _readDatabase(): Date[]

  _writeDatabase(database: IDatabase): void;

  _syncDatabase(database: IDatabase): void;

}
// }
