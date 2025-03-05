export interface EditClassConfigsPayload {
  maxAdvanceTime: number;
  maxRecoveryDays: number;
  maxCancellationPerMonth: number;
  minHoursBeforeCancellation: number;
}

export interface IClassConfigs {
  id?: number;
  maxAdvanceTime: number;
  maxRecoveryDays: number;
  maxCancellationPerMonth: number;
  minHoursBeforeCancellation: number;
}
