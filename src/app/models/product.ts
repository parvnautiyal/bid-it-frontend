export class Product {

  constructor(public id: string,
              public name: string,
              public description: string,
              public img: string,
              public duration: string,
              public start: string,
              public end: string,
              public amount: number,
              public user: PartialUser,
              public status: string,
              public bids: Object) {}
}

interface PartialUser {
  id: string,
  username: string,
  name: string,
  email: string,
  contact: string
}
