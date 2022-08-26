export default function Header() {
    return (
        <header className="d-flex justify-content-center p-1">
            <section className="header-image-section">
                <img className="logo" src="assets/images/logo.jpg" height={75} width={75} />
            </section>
            <section className="title-section">
                <h1>shiridi sai sansthan</h1>
                <p className="subtitle">velipula veeshi, opposite kasi vishweshwara temple, anakapalle.</p>
            </section>
        </header>
    );
};