import { getPxFromRem } from "../helpers/utils";

export default function Donations() {
    return (
        <section id="donations">
            <h4 className="section-title">Donations</h4>
            
            <img src="assets/images/hr_new.png" alt="hr" className="image-hr" />

            <section className="row">
                <div className="col-md-3" />
                
                <div className="col-md-3">
                <img
                    src="assets/images/donations.jpg" 
                    width={getPxFromRem(18)}
                    height={getPxFromRem(18)}
                    className="donations-image"
                />
                </div>

                <div className="donations-content col-md-3">
                    <p className="donation-content-title-red">Help us serve the needy</p>
                    <h6>Bank account details</h6>
                    <h6 className="donation-content-title-blue">State Bank Of India</h6>
                    <p className="font-lighter">Anakapalle Branch</p>
                    <p className="font-lighter">Account No : 52003699780</p>
                    <p className="font-lighter">IFSC code : SBIN0008556</p>
                    <p className="font-lighter">SWIFT : SBIN0TH2K58</p>

                    <p className="custom-or">OR</p>

                    <button className="themed-btn">Donate via UPI</button>
                </div>
            </section>
        </section>
    );
};