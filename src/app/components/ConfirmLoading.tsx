import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "@/app/styles/ConfirmLoading.css";

const ConfirmLoading: React.FC = () => {
    return (
        <div className="loading-container d-flex justify-content-center align-items-center">
            <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
        </div>
    );
};

export default ConfirmLoading;