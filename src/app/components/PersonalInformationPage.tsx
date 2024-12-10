import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { info } from "next/dist/build/output/log";

//todo personal_information props type is not defined
const PersonalInformationPage: React.FC = (props) => {
    const { personal_information, setPersonalInformation, readOnly } = props;
    return (
        <div className="personal-info-container">
            <h2>Personal Information</h2>
            <div className="table-responsive">
                <table className="table table-white">
                    <thead>
                        <tr>
                            <th>Ticket Type</th>
                            <th>Moviegoer</th>
                            <th>Phone Number</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personal_information.map((information, index) => (
                            <tr key={index}>
                                <td>
                                    <input
                                        type="text"
                                        value={information.ticketType}
                                        readOnly
                                        onChange={(e) => {
                                            const newInfo = [
                                                ...personal_information,
                                            ];
                                            newInfo[index].ticketType =
                                                e.target.value;
                                            setPersonalInformation(newInfo);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={information.moviegoer}
                                        readOnly={readOnly}
                                        onChange={(e) => {
                                            const newInfo = [
                                                ...personal_information,
                                            ];
                                            newInfo[index].moviegoer =
                                                e.target.value;
                                            setPersonalInformation(newInfo);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={information.phone}
                                        readOnly={readOnly}
                                        onChange={(e) => {
                                            const newInfo = [
                                                ...personal_information,
                                            ];
                                            newInfo[index].phone =
                                                e.target.value;
                                            setPersonalInformation(newInfo);
                                        }}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        value={information.email}
                                        readOnly={readOnly}
                                        onChange={(e) => {
                                            const newInfo = [
                                                ...personal_information,
                                            ];
                                            newInfo[index].email =
                                                e.target.value;
                                            setPersonalInformation(newInfo);
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};
export default PersonalInformationPage;
