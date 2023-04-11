import React from 'react';

const Hero = ({hero}) => {
    return (
        <article>
            <h1>{hero.nickname}</h1>
            <h2>Also known as {hero.realName}</h2>
            {hero.images.map((image) => (
                <img
                    key={image.id}
                    src={`http://localhost:5000/images/${image.path}`}
                    alt={hero.nickname}
                />
            ))}
            <p>Catchphrase: {hero.catchphrase}</p>
            <p>Origin description</p>
            <p>{hero.originDescription}</p>
            <p>Superpowers</p>
            <ul>
                {hero.superpowers.map((power) => (
                    <li key={power.id}>{power.name}</li>
                ))}
            </ul>
        </article>
    );
}

export default Hero;
