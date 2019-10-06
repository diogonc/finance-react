export function mapTransactionType(type) {
    if (type === 'credit')
        return 'Crédito';
    else if (type === 'debit')
        return 'Débito';
    else if (type === 'debit-transfer')
        return 'Transferência de débito';
    else if (type === 'credit-transfer')
        return 'Transferência de crédito';
    return 'Não definido';
}