export function mapTransactionType(type) {
    if (type === 'credit')
        return 'Crédito';
    else if (type === 'debit' )
        return 'Débito';
    return 'Não definido';
}