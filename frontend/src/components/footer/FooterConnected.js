import { Link } from 'react-router-dom';

/**
 * Composant correspondat au footer lorsqu'on est déconnecté
 *
 * @component
 */
function FooterConnected() {
  return (
    <footer className="footer-connected">
      <div className="container-footer__description">
        <div className="row__description">
          <div className="">
            <h2>A propos</h2>
            <p className="">
              Notre entreprise, spécialisée dans la grande distribution, est en pleine expansion. Nous avons
              actuellement plus de 600 collaborateurs et avons beaucoup recruté depuis quelques années. Nous étions
              uniquement 300 il y a 3 ans.
            </p>
          </div>
        </div>
      </div>
      <hr />

      <div className="container-footer__bottom">
        <div className="row__bottom">
          <div className="container-copy">
            <p className="copyright-text">
              Copyright &copy; 2022 All Rights Reserved by
              <Link to="#"> Groupomania</Link>.
            </p>
          </div>

          <div className="container-socials-icons">
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
}

export default FooterConnected;
