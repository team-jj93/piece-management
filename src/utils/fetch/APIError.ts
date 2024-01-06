export interface APIErrorInterface {
  order: "refetch" | "alert" | "reset";
  message: string;
}

export class APIError {

  constructor(private message: APIErrorInterface["message"] = "", private order: APIErrorInterface["order"] = "alert") {
  }

  private set(order: APIErrorInterface["order"], message: APIErrorInterface["message"]) {
    this.order = order;
    this.message = message;

    return this;
  }

  public refetch(message: APIErrorInterface["message"] = "") {
    return this.set("refetch", message);
  }

  public alert(message: APIErrorInterface["message"] = "") {
    return this.set("alert", message);
  }

  public reset(message: APIErrorInterface["message"] = "") {
    return this.set("reset", message);
  }

  public get(): APIErrorInterface {
    return {
      order: this.order,
      message: this.message
    }
  }
}