import React, { useState } from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './Hero.module.css';
import { deleteHero, deletePower, addPower, editHero } from '../../api';
import { getHeroes } from '../../redux/slices/heroSlice';
import { useDispatch } from 'react-redux';
import Modal from 'react-modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';

Modal.setAppElement('#root');

const validationPowerSchema = yup.object().shape({
    powerName: yup.string()
    .trim()
    .min(3, 'Length of superpower name should be at least 3 symbols')
    .required('Superpower name is required')
})

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


const Hero = ({hero}) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [modalAddPowerOpen, setModalAddPowerOpen] = useState(false);
    const [modalEditHeroOpen, setModalEditHeroOpen] = useState(false);

    const dispatch = useDispatch();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    }

    const deleteHandler = async () => {
        await deleteHero((hero.id));
        dispatch(getHeroes());
        setModalOpen(false);
    }

    const deletePowerHandler = async (powerId) => {
        await deletePower(hero.id, powerId);
        dispatch(getHeroes());
    }

    const handleAddPowerSubmit = async (values, {resetForm}) => {
        try {
            await addPower(hero.id, [values.powerName]);
            dispatch(getHeroes());
            setModalAddPowerOpen(false);
            resetForm();
        } catch (err) {
            console.error(err);
        }
    }

    const editHeroHandler = async (values) => {
        try {
            await editHero(hero.id, values);
            dispatch(getHeroes());
            setModalEditHeroOpen(false);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <article>
            <h1>{hero.nickname}</h1>
            <h2>Also known as {hero.realName}</h2>
            <Slider {...settings} style={{width: "40%", margin: "30px"}}>
            {hero.images.map((image) => (
                <img
                    key={image.id}
                    src={`http://localhost:5000/images/${image.path}`}
                    alt={hero.nickname}
                />
            ))}
            </Slider>
            <p>Catchphrase: {hero.catchphrase}</p>
            <p>Origin description:</p>
            <p>{hero.originDescription}</p>
            <p>Superpowers:</p>
            <ul>
                {hero.superpowers.map((power) => (
                    <table>
                        <tr>
                            <td>
                                <li key={power.id}>{power.name}</li>
                            </td>
                            <td>
                                <button onClick={() => deletePowerHandler(power.id)}>Delete power</button>
                            </td>
                        </tr>
                    </table>
                ))}
            </ul>

            <button onClick={() => setModalEditHeroOpen(true)}>Edit superhero</button>

            <button onClick={() => setModalOpen(true)}>Delete superhero</button>

            <Modal
                isOpen={modalOpen}
                onRequestClose={() => setModalOpen(false)}
                contentLabel="Delete Hero Modal"
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
                <h2>Delete superhero</h2>
                <p>Are you sure you want to delete {hero.nickname}?</p>
                <button onClick={deleteHandler}>Yes</button>
                <button onClick={() => setModalOpen(false)}>No</button>
            </Modal>

            <button onClick={() => setModalAddPowerOpen(true)}>Add superpower</button>

            <Modal
                isOpen={modalAddPowerOpen}
                onRequestClose={() => setModalAddPowerOpen(false)}
                contentLabel="Add Superpower Modal"
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
                <h2>Add superpower</h2>
                <Formik
                    initialValues={{powerName: ''}}
                    validationSchema={validationPowerSchema}
                    onSubmit={handleAddPowerSubmit}
                >
                    {(props) => (
                        <Form>
                            <label>
                                Superpower name
                                <Field type="text" name="powerName" />
                                <ErrorMessage name="powerName" />
                            </label>

                            <button type="submit">Confirm</button>
                            <button type="button" onClick={() => setModalAddPowerOpen(false)}>Cancel</button>
                        </Form>
                    )}
                </Formik>
            </Modal>

            <Modal
                isOpen={modalEditHeroOpen}
                onRequestClose={() => setModalEditHeroOpen(false)}
                contentLabel="Edit Superhero Modal"
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
                <h2>Edit superhero</h2>

                <Formik
                    initialValues={{
                        nickname: hero.nickname,
                        realName: hero.realName,
                        originDescription: hero.originDescription,
                        catchphrase: hero.catchphrase
                    }}
                    validationSchema={validationHeroSchema}
                    onSubmit={editHeroHandler}
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
                            <button type="button" onClick={() => setModalEditHeroOpen(false)}>Cancel</button>
                        </Form>
                    )}
                </Formik>
            </Modal>
        </article>
    );
}

export default Hero;
