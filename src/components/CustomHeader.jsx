import React from 'react'
import '../sass/CustomHeader.scss';

function CustomHeader() {
    return (
        <div className='header'>
            <div className='row-flex'>
                <div className='col-epias-logo'>
                    <img src={'/epiasLogo.svg'} className='epias-logo' alt='Logo'></img>
                </div>
                <div className='col-blank'></div>
                <div className='col-calisma-alani'>
                    <div className='row-flex'>
                        <div className='col-save-image'>
                            <div className='save-image-div'>
                                <img src={'/floppy-disk-solid.svg'} className='save-image-logo' alt='Logo'></img>
                            </div>
                        </div>
                        <div className='text'>Çalışma Alanı 1</div>
                    </div>
                </div>
                <div className='col-profile'>
                    <div className='row-flex'>
                        <div className='col-profile-image'>
                            <div className='profile-image'>
                                AY
                            </div>
                        </div>
                        <div>
                            <div className='profile-text'>
                                <div className='profile-first-text'>Merhaba, </div>
                                <div className='profile-name'> Ayhan</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomHeader