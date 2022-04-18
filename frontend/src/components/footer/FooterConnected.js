import { Link } from 'react-router-dom';

const FooterConnected = () => {
  return (
    <footer className="footer-connected">
      <div className="container">
        <div className="row">
          <div className="col-sm-12 col-md-6">
            <h6>A propos</h6>
            <p className="text-justify">
              Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons
              actuellement plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous
              étions uniquement 300 il y a 3 ans.
            </p>
          </div>
        </div>
      </div>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col-md-8 col-sm-6 col-xs-12">
            <p className="copyright-text">
              Copyright &copy; 2022 All Rights Reserved by
              <Link to="#"> Groupomania</Link>.
            </p>
          </div>

          <div className="col-md-4 col-sm-6 col-xs-12">
            <ul className="social-icons">
              <li>
                <Link className="facebook" to="#header-connected">
                  <i className="fa fa-facebook"></i>
                </Link>
              </li>
              <li>
                <Link className="twitter" to="#header-connected">
                  <i className="fa fa-twitter"></i>
                </Link>
              </li>
              <li>
                <Link className="dribbble" to="#header-connected">
                  <i className="fa fa-dribbble"></i>
                </Link>
              </li>
              <li>
                <Link className="linkedin" to="#header-connected">
                  <i className="fa fa-linkedin"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterConnected;
