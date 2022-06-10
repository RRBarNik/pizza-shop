import React, { useEffect, useState } from 'react';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

import pizzas from '../assets/pizzas.json';
import ReactPaginate from 'react-paginate';
import Pagination from '../components/Pagination';

export type SortType = {
    name: string;
    sortProperty: string;
}

type PropsType = {
    searchValue: string;
}

const Home: React.FC<PropsType> = ({ searchValue }) => {
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [categoryId, setCategoryId] = useState(0);
    const [currentPage, setCurrentPage] = useState(0);
    const [sortType, setSortType] = useState<SortType>({
        name: 'популярности', sortProperty: 'rating'
    });

    useEffect(() => {
        setIsLoading(true);

        const order = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.sortProperty.replace('-', '');
        const category = categoryId > 0 ? `category=${categoryId}` : '';
        const search = searchValue ? `&search=${searchValue}` : '';

        fetch(`https://62a1d957cd2e8da9b0fc679d.mockapi.io/items?page=1&limit=4&${category}
            ${search}&sortBy=${sortBy}&order=${order}`)
            .then((res) => {
                return res.json();
            })
            .then((json) => {
                setItems(json);
                setIsLoading(false);
            });
        window.scrollTo(0, 0);
    }, [categoryId, sortType, searchValue, currentPage]);

    const skeleton = [...new Array(6)].map((_, index) => <Skeleton key={index} />);

    const pizzaItems = pizzas.map((obj) => (<PizzaBlock key={obj.id} {...obj} />));

    return (
        <div className='container'>
            <div className="content__top">
                <Categories value={categoryId} onChangeCategory={(id: number) => setCategoryId(id)} />
                <Sort value={sortType} onChangeSort={(id: SortType) => setSortType(id)} />
            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">
                {isLoading ? skeleton : pizzaItems}
            </div>
            <Pagination onChangePage={(number: number) => setCurrentPage(number)} />
        </div>
    );
}

export default Home;