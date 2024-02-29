export class Notification {
  constructor(
    public _id?: string,
    public type?: string,
    public target?: string,
    public titre?: string,
    public text?: string,
    public lien?: string,
    public dateNotification?: Date,
    public checked?: boolean,
  ){

  }
}
