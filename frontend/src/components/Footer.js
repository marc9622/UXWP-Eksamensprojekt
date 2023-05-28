import 'bootstrap/dist/css/bootstrap.min.css';

export default function Footer() {
    return (
        <footer className='footer mt-auto py-3 bg-light'> {/* mt-auto pushes the footer to the bottom of the page */}
            <div className='container d-flex justify-content-between'> {/* d-flex makes the div a flexbox, justify-content-between pushes the content to the sides */}
                <span className='text-muted'>This is simply some text</span>
                <div>
                    <img style={{width: '1rem', height: '1rem'}} className='mx-1' src='../assets/test-box.png' />
                    <a href='/test'>Test</a>
                </div>
            </div>
        </footer>
    );
}
