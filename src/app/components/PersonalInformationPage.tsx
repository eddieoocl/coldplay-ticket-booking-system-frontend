import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

//todo personal_information props type is not defined
const PersonalInformationPage: React.FC = (props) => {
    const { personal_information, setPersonalInformation,readOnly } = props;
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
                            <td><input type="text" value={information.ticket_type} onChange={(e) => {
                                const newInfo = [...personal_information];
                                newInfo[index].ticket_type = e.target.value;
                                setPersonalInformation(newInfo);
                            }} /></td>
                            <td><input type="text" value={information.first_name} onChange={(e) => {
                                const newInfo = [...personal_information];
                                newInfo[index].first_name = e.target.value;
                                setPersonalInformation(newInfo);
                            }} /> <input type="text" value={information.last_name} onChange={(e) => {
                                const newInfo = [...personal_information];
                                newInfo[index].last_name = e.target.value;
                                setPersonalInformation(newInfo);
                            }} /></td>
                            <td><input type="text" value={information.phone} onChange={(e) => {
                                const newInfo = [...personal_information];
                                newInfo[index].phone = e.target.value;
                                setPersonalInformation(newInfo);
                            }} /></td>
                            <td><input type="text" value={information.email} onChange={(e) => {
                                const newInfo = [...personal_information];
                                newInfo[index].email = e.target.value;
                                setPersonalInformation(newInfo);
                            }} /></td>

                        </tr>
                    ))}
                    </tbody>
                </table>
                {!readOnly &&
                    <button className="side-button" onClick={() => window.location.href = "/information"}>edit</button>}
            </div>
        </div>
    );
};
export default PersonalInformationPage;