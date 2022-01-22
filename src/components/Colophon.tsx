import React from 'react';
import { BsLinkedin as IconLinkedin, BsGithub as IconGithub } from 'react-icons/bs';

function Colophon() {
  return (
    <div className="Colophon">
      <a href="https://lukechalfant.com/" aria-label="Luke's Website" title="lukechalfant.com">Created by Luke Chalfant</a>
      <a className="Colophon__Link--IconLink" aria-label="Luke's Linked-in" title="Luke's Linkedin (New Tab)" target="_blank" href="https://www.linkedin.com/in/kenmorechalfant/"><IconLinkedin /></a>
      <a className="Colophon__Link--IconLink" aria-label="Luke's Github" title="Github Repo for this Project (New Tab)" target="_blank" href="https://github.com/kenmorechalfant/unit-converter-react"><IconGithub /></a>
    </div>
  );
}

export default Colophon;