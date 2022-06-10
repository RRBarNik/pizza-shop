import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

import pizzas from '../assets/pizzas.json';

const Home = () => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(true);
        fetch('https://62a1d957cd2e8da9b0fc679d.mockapi.io/items')
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, []);


    return (
        <div className='container'>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {
                    isLoading
                        ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
                        : pizzas.map((obj) => (<PizzaBlock key={obj.id} {...obj} />))
                }
            </div>
        </div>
    );
}

export default Home;