import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Hero from '../../components/Hero';
import { getHeroes } from '../../redux/slices/heroSlice';
import styles from './HeroesPage.module.css';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import { addHero } from '../../redux/slices/heroSlice';
import CONSTANTS from '../../constants';
import PacmanLoader from "react-spinners/PacmanLoader";


Modal.setAppElement('#root');

const validationHeroSchema = yup.object().shape({
    nickname: yup.string()
        .trim()
        .min(3, 'Length of superhero nickname should be at least 3 symbols')
        .required('Superhero nickname is required'),
    realName: yup.string()
        .trim()
        .min(3, 'Length of superhero real name should be at least 3 symbols')
        .required('Superhero real name is required'),
    originDescription: yup.string()
        .trim()
        .min(10, 'Length of superhero origin description should be at least 10 symbols')
        .required('Superhero origin description is required'),
    catchphrase: yup.string()
        .trim()
        .min(3, 'Length of superhero catchphrase should be at least 3 symbols')
        .required('Superhero catchphrase is required'),
})

const HeroesPage = () => {
    const { heroes, totalHeroesCount, lastPageNumber, isLoading, error } = useSelector((state) => state.heroes);
    console.log(totalHeroesCount)
    console.log(lastPageNumber)
    const dispatch = useDispatch();
    const [searchHero, setSearchHero] = useState('');
    const [modalAddHeroOpen, setModalAddHeroOpen] = useState(false);
    const [pageNumber, setPageNumber] = useState(0);
    const [prevButtonDisabled, setPrevButtonDisabled] = useState(true);
    const [nextButtonDisabled, setNextButtonDisabled] = useState(true);

    useEffect(() => {
        setPrevButtonDisabled(pageNumber === 0);
        setNextButtonDisabled(pageNumber === lastPageNumber - 1);
    }, [pageNumber, lastPageNumber])

    useEffect(() => {
        dispatch(getHeroes(pageNumber));
    }, [pageNumber, totalHeroesCount])

    const nextPage = () => {
        if(pageNumber < lastPageNumber - 1) {
            setPageNumber(pageNumber + 1);
        }
    }

    const prevPage = () => {
        if(pageNumber > 0) {
            setPageNumber(pageNumber - 1);
        }
    }

    if(isLoading) {
        return <PacmanLoader
            color="#36d7b7"
            cssOverride={{
                display: "block",
                margin: "0 auto"
            }}
            loading={isLoading}
            size={150}
        />;
    }

    if(error) {
        return <div>ERROR</div>
    }

    const filteredHeroes = heroes.filter((hero) => 
        hero.nickname.toLowerCase().includes(searchHero.toLowerCase())
    )

    const heroesCards = filteredHeroes.map(hero => <Hero key={hero.id} hero={hero} currentPage={pageNumber} setPageNumber={setPageNumber} />)

    return (
        <div>
            <button onClick={() => setModalAddHeroOpen(true)}>Add superhero</button>

            <Modal
                isOpen={modalAddHeroOpen}
                onRequestClose={() => setModalAddHeroOpen(false)}
                contentLabel="Add Hero Modal"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                    }
                }}
            >
                <h2>Add superhero</h2>

                <Formik
                    initialValues={{
                        nickname: '',
                        realName: '',
                        originDescription: '',
                        catchphrase: ''
                    }}
                    validationSchema={validationHeroSchema}
                    onSubmit={async(values, {resetForm}) => {
                        try {
                            await dispatch(addHero(values));
                            dispatch(getHeroes());
                            setPageNumber(0);
                            setModalAddHeroOpen(false);
                            resetForm();
                        } catch (error) {
                            console.error(error)
                        }
                    }}
                >
                    {(props) => (
                        <Form>
                            <div>
                                <label>
                                    Superhero nickname
                                    <Field type="text" name="nickname" />
                                    <ErrorMessage name="nickname" component="div" />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Superhero real name
                                    <Field type="text" name="realName" />
                                    <ErrorMessage name="realName" component="div" />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Superhero origin description
                                    <Field type="text" name="originDescription" />
                                    <ErrorMessage name="originDescription" component="div" />
                                </label>
                            </div>
                            <div>
                                <label>
                                    Superhero catchphrase
                                    <Field type="text" name="catchphrase" />
                                    <ErrorMessage name="catchphrase" component="div" />
                                </label>
                            </div>

                            <button type="submit">Confirm</button>
                            <button type="button" onClick={() => setModalAddHeroOpen(false)}>Cancel</button>
                        </Form>
                    )}
                </Formik>
            </Modal>
                                        
            <input 
            type="text" 
            value={searchHero} 
            onChange={({target: {value}}) => setSearchHero(value)} 
            placeholder='Search by hero nickname'
            />
            {heroesCards}
            <div>
                <button onClick={prevPage} disabled={prevButtonDisabled}>Previous page</button>
                <button onClick={nextPage} disabled={nextButtonDisabled}>Next page</button>
                <p>You are on page {pageNumber + 1} of {lastPageNumber}</p>
            </div>
        </div>
    );
}

export default HeroesPage;
