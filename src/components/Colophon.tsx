import React from 'react';
import { BsLinkedin as IconLinkedin, BsGithub as IconGithub } from 'react-icons/bs';

function Colophon() {
  return (
    <div className="Colophon">
      <a href="https://lukechalfant.com/" aria-label="Luke's Website">Created by Luke Chalfant</a>
      <a className="Colophon__Link--IconLink" aria-label="Luke's Linked-in" href="https://www.linkedin.com/in/kenmorechalfant/"><IconLinkedin /></a>
      <a className="Colophon__Link--IconLink" aria-label="Luke's Github" href="https://github.com/kenmorechalfant/unit-converter-react"><IconGithub /></a>
    </div>
  );
}

export default Colophon;