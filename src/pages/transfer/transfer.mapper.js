export const mapTransferVmToApi = (transfer) => {
  let spacedIban = '';
  for (let i = 0; i < transfer.iban.length; i += 4) {
    spacedIban += transfer.iban.slice(i, i + 4) + ' ';
  }
  return {
    alias: transfer.alias,
    iban: spacedIban,
    name: transfer.name,
    amount: transfer.amount,
    concept: transfer.concept,
    notes: transfer.notes,
    date:
      transfer.year !== ''
        ? new Date(
            `${transfer.year}/${transfer.month}/${transfer.day}`
          ).toLocaleDateString()
        : new Date().toLocaleDateString(),
    email: transfer.email,
  };
};
