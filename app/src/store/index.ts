import { action, computed, observable } from 'mobx'

type User = {
  id: number;
  userName: string;
}

class Store {
  @observable public user: User = { id: 0, userName: '' }
  @observable public token: string = ''

  @computed
  public get userInfo() {
    return this.user
  }

  @action
  public updateUser(user: User) {
    this.user = user
  }

  @action
  public updateToken(token: string) {
    this.token = token
  }
}

const users = new Store()

const stores = {
  users
}

export {
  Store
}

export default stores
