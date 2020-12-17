import Link from "next/link";
import Logo from "../static/logo.svg";

export default function Header() {
  return (
    <header>
      <nav>
        <ul>
          <li id="logo">
            <Link href="/">
              <a>
                {/* <Logo /> */}
                <img src="../static/logo@2x.png" alt="MyLocal Logo" />
              </a>
            </Link>
          </li>

          {/* <div role="button" className="burgerMenu" onClick={burgerClicked} tabIndex={0}>
            <div className="burgerLines"></div>
            <div className="burgerLines"></div>
          </div>
          <div className="linkWrapper">
            <li className="menuLink">
              <Link href="/blog">Blog</Link>
            </li>
            <li className="menuLink">
              <Link href="/about">About</Link>
            </li>
            <li className="menuLink">
              <Link href="/contact">Contact</Link>
            </li>
          </div> */}
        </ul>
      </nav>
    </header>
  );
}

function burgerClicked(e) {
  console.log(e.target);
  e.target.parentNode.classList.toggle("menuOpen");
}
