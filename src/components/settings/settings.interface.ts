export interface ICancelationSettings {
  maxRecoveryDays: number;
  maxCancellationPerMonth: number;
  minHoursBeforeCancellation: number;
}

export const emptyCancelationSettings = {
  maxRecoveryDays: 60,
  maxCancellationPerMonth: 2,
  minHoursBeforeCancellation: 2,
};
