import React, { useState, useEffect } from 'react';

const PaymentForm: React.FC = () => {
    const [paymentMethod, setPaymentMethod] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [paypalAccount, setPaypalAccount] = useState('');
    const [error, setError] = useState('');
    const [amount, setAmount] = useState(0);
    const [ticketType, setTicketType] = useState('');
    const [orderNumber, setOrderNumber] = useState('');

    useEffect(() => {
        // Fetch the payment amount, ticket type, and order number from the backend
        fetch('/api/payment-details')
            .then(response => response.json())
            .then(data => {
                setAmount(data.amount);
                setTicketType(data.ticketType);
                setOrderNumber(data.orderNumber);
            })
            .catch(error => setError('Failed to fetch payment details.'));
    }, []);

    const handlePaymentMethodChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPaymentMethod(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Validate payment details
        if (paymentMethod === 'creditCard' && (!cardNumber || !expiryDate || !cvv)) {
            setError('Please fill in all required fields.');
            return;
        }
        if (paymentMethod === 'paypal' && !paypalAccount) {
            setError('Please enter your PayPal account number.');
            return;
        }
        // Process payment securely
        // On successful payment, navigate to confirmation page
        history.push('/confirmation');
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="paymentMethod">Payment Method:</label>
                <select id="paymentMethod" value={paymentMethod} onChange={handlePaymentMethodChange}>
                    <option value="">Select a payment method</option>
                    <option value="creditCard">Credit Card</option>
                    <option value="paypal">PayPal</option>
                </select>
            </div>
            {paymentMethod === 'creditCard' && (
                <div>
                    <div>
                        <label htmlFor="cardNumber">Card Number:</label>
                        <input
                            type="text"
                            id="cardNumber"
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="expiryDate">Expiry Date:</label>
                        <input
                            type="text"
                            id="expiryDate"
                            value={expiryDate}
                            onChange={(e) => setExpiryDate(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="cvv">CVV:</label>
                        <input
                            type="text"
                            id="cvv"
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                        />
                    </div>
                </div>
            )}
            {paymentMethod === 'paypal' && (
                <div>
                    <label htmlFor="paypalAccount">PayPal Account Number:</label>
                    <input
                        type="text"
                        id="paypalAccount"
                        value={paypalAccount}
                        onChange={(e) => setPaypalAccount(e.target.value)}
                    />
                </div>
            )}
            <div>
                <label>Amount to be Paid:</label>
                <p>{amount}</p>
            </div>
            <div>
                <label>Ticket Type:</label>
                <p>{ticketType}</p>
            </div>
            <div>
                <label>Order Number:</label>
                <p>{orderNumber}</p>
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <button type="submit">Submit Payment</button>
        </form>
    );
};

export default PaymentForm;