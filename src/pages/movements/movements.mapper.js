export const mapMovementsListApiToVm = (movementsList) =>
  Array.isArray(movementsList)
    ? movementsList.map((movement) => mapMovementApiToVm(movement))
    : [];

export const mapAccountApiToVm = (account) => ({
    ...account,
    balance: `${account.balance} €`,
  });

const mapMovementApiToVm = (movement) => ({
  ...movement,
  transaction: new Date(movement.transaction).toLocaleDateString(),
  realTransaction: new Date(movement.transaction).toLocaleDateString(),
  amount: `${movement.amount} €`,
  balance: `${movement.balance} €`,
});