import { EnvironmentOutlined } from '@ant-design/icons';
import { Card, Input } from 'antd';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Menu from '~/components/elements/menu/Menu';
import ElectronicHeaderActions from '~/components/shared/headers/modules/ElectronicHeaderActions';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import CollectionRepository from '~/repositories/CollectionRepository';
import { stickyHeader } from '~/utilities/common-helpers';

const HeaderTechnology = () => {
    const [Categories, setCategories] = useState([]);
    const [address, setAddress] = useState('');
    const [location, setLocation] = useState({ lat: 0, lng: 0 });
    // console.log(location)
    // console.log(address)

    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
        getCategories();

        const position = async () => {
            await navigator.geolocation.getCurrentPosition(
                position => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    })
                    fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + position.coords.latitude + ',' + position.coords.longitude + '&key=AIzaSyBMbdKW4sBsRCSIoUWkadnkWq49cuu50XI')
                        .then((response) => response.json())
                        .then((data) => {
                            if (data.results && data.results.length > 0) {
                                const addressComponents = data.results[0].address_components;
                                const address = addressComponents.find(component =>
                                    component.types.includes('sublocality_level_1')
                                )?.short_name;
                                const city = addressComponents.find(component =>
                                    component.types.includes('locality')
                                )?.long_name;
                                const country = addressComponents.find(component =>
                                    component.types.includes('country')
                                )?.long_name;
                                setAddress((address + ', ' + country));
                            }
                        })
                }, err => {
                    console.log(err)
                    setLocation({
                        lat: 24.8607343,
                        lng: 67.0011364
                    })
                    setAddress('Karachi, Pakistan')
                }
            );
        }
        position();
    }, []);

    const getCategories = () => {
        CollectionRepository.getCategories().then((e) => {
            setCategories(e);
        });
    }

    const handleChange = (address) => {
        console.log("address", address);
        setAddress(address)
    };

    const handleSelect = (address) => {
        geocodeByAddress(address)
            .then(results => getLatLng(results[0]))
            .then(latLng => {
                setLocation(latLng);
                console.log('Success', latLng)
            })
            .catch(error => console.error('Error', error));
    };

    return (
        <header
            className="header header--standard header--technology"
            id="headerSticky">
            <div className="header__content">
                <div className="container-fluid">
                    <div className="header__content-left">
                        <Link href="/">
                            <a className="ps-logo">
                                <img
                                    src="/static/img/realbazar.png"
                                    alt="Real_Bazar"
                                />
                            </a>
                        </Link>
                        <div className="menu--product-categories">
                            <div className="menu__toggle">
                                <i className="icon-menu"></i>
                            </div>
                            <div className="menu__content">
                                <Menu
                                    source={Categories}
                                    className="menu--dropdown"
                                    slug={"retailer"}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="header__content-center">
                        <PlacesAutocomplete
                            value={address}
                            onChange={handleChange}
                            onSelect={handleSelect}
                        >
                            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                                <div style={{ position: 'relative' }}>
                                    <Input
                                        {...getInputProps({
                                            placeholder: 'Search Location ...',
                                            className: 'location-search-input',
                                        })}
                                        prefix={<EnvironmentOutlined />}
                                        style={{ height: '4.2rem', width: '18rem' }}
                                    />
                                    <div className="autocomplete-dropdown-container" style={{ width: '100%', position: 'absolute', padding: '0 !important', zIndex: 9999999999999 }}>
                                        {loading && <div>Loading...</div>}
                                        {suggestions.map(suggestion => {
                                            const className = suggestion.active
                                                ? 'suggestion-item--active'
                                                : 'suggestion-item';
                                            // inline style for demonstration purpose
                                            const style = suggestion.active
                                                ? { backgroundColor: '#e4e4e4', cursor: 'pointer', padding: '0.5rem' }
                                                : { backgroundColor: '#ffffff', cursor: 'pointer', padding: '0.5rem' };
                                            return (
                                                <div onClick={() => setAddress(suggestion.description)}>
                                                    <div
                                                        {...getSuggestionItemProps(suggestion, {
                                                            className,
                                                            style,
                                                        })}
                                                    >
                                                        <span>{suggestion.description}</span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </PlacesAutocomplete>
                        <SearchHeader Categories={Categories} location={location} />
                    </div>
                    <div className="header__content-right">
                        <ElectronicHeaderActions />
                    </div>
                </div>
            </div>
        </header>
    );
};

export default HeaderTechnology;
