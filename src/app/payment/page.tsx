// src/app/payment/page.tsx
"use client";

import React from 'react';
import PaymentForm from '../../components/PaymentForm';
import styles from './page.module.css';

const PaymentPage: React.FC = () => {
    return (
        <div className={styles.paymentPage}>
            <div className={styles.paymentFormContainer}>
                <h1>Payment Page</h1>
                <PaymentForm />
            </div>
        </div>
    );
};

export default PaymentPage;