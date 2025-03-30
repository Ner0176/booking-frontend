export interface ICancelationSettings {
  maxAdvanceTime: number;
  maxRecoveryDays: number;
  maxCancellationPerMonth: number;
  minHoursBeforeCancellation: number;
}

export const emptyCancelationSettings = {
  maxAdvanceTime: 15,
  maxRecoveryDays: 60,
  maxCancellationPerMonth: 2,
  minHoursBeforeCancellation: 2,
};

export const cancellationReasons: Record<string, keyof ICancelationSettings> = {
  Anticipation: "minHoursBeforeCancellation",
  MaxCancelations: "maxCancellationPerMonth",
  MaxAdvanceTime: "maxAdvanceTime",
  MaxRecovery: "maxRecoveryDays",
};
