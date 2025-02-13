export interface EditClassConfigsPayload {
  maxRecoveryDays: number;
  maxCancellationPerMonth: number;
  minHoursBeforeCancellation: number;
}

export interface IClassConfigs {
  id?: number;
  maxRecoveryDays: number;
  maxCancellationPerMonth: number;
  minHoursBeforeCancellation: number;
}
