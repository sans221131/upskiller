export interface ActionResponse<TData = undefined> {
  success: boolean;
  data?: TData;
  error?: string;
}
