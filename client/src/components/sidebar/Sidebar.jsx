import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./sidebar.css";

export default function Sidebar() {
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const fetchCats = async () => {
      const res = await axios.get("/category");
      setCats(res.data);
    };
    fetchCats();
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero,
          adipisci culpa enim sunt, ut labore voluptates nemo, facere quis rem
          perspiciatis.
        </p>
      </div>

      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map((cat) => (
            <Link to={`?cat=${cat.name}`} className="link ">
              <li key={cat.index} className="sidebarListItem">
                {cat.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <ul className="sidebarListIcon">
          <li className="sidebarListItemIcon">
            <i className="sidebarIcon bi bi-facebook"></i>
          </li>
          <li className="sidebarListItemIcon">
            <i className="sidebarIcon bi bi-instagram"></i>
          </li>
          <li className="sidebarListItemIcon">
            <i className="sidebarIcon bi bi-twitter"></i>
          </li>
          <li className="sidebarListItemIcon">
            <i className="sidebarIcon bi bi-pinterest"></i>
          </li>
        </ul>
      </div>
    </div>
  );
}
