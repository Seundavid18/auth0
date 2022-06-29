import React from "react";
import {AiOutlineGithub} from "react-icons/ai";
import {AiFillLinkedin} from 'react-icons/ai';
import {AiOutlineTwitter} from 'react-icons/ai';
import {AiOutlineInstagram} from 'react-icons/ai';

function Footer() {
    return(
        <footer>
            <div className="footer">
                <h1 className="fs-4 fw-bolder">Seun David</h1>
                <div className="pt-3">
                    <AiOutlineGithub size={20} className="me-2" />
                    <AiFillLinkedin size={20} className="me-2" />
                    <AiOutlineTwitter size={20} className="me-2" />
                    <AiOutlineInstagram size={20} className="me-2" />
                </div>
                <div className="fs-6 pt-3">&copy; Copyright 2022</div>
            </div>
        </footer>
    )
}

  
  export default Footer;
  