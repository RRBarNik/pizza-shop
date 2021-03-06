import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Sort from '../components/Sort';

import pizzas from '../assets/pizzas.json';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { RootState } from '../redux/store';
import { setCategoryId } from '../redux/slices/filterSlice';

export type SortType = {
    name: string;
    sortProperty: string;
}

const Home: React.FC = () => {
    const dispatch = useDispatch();
    const categoryId = useSelector((state: RootState) => state.filter.categoryId);
    const sortType = useSelector((state: RootState) => state.filter.sort.sortProperty);

    const { searchValue } = React.useContext(SearchContext);
    const [items, setItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);

    const onClickCategory = (id: number) => {
        dispatch(setCategoryId(id));
    }

    useEffect(() => {
        setIsLoading(true);

        const order = sortType.includes('-') ? 'asc' : 'desc';
        const sortBy = sortType.replace('-', '');
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
                <Categories value={categoryId} onChangeCategory={(id: number) => onClickCategory(id)} />
                <Sort />
            </div>
            <h2 className="content__title">?????? ??????????</h2>
            <div className="content__items">
                {isLoading ? skeleton : pizzaItems}
            </div>
            <Pagination onChangePage={(number: number) => setCurrentPage(number)} />
        </div>
    );
}

export default Home;