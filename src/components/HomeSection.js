import {
    Link
} from "react-router-dom";

const HomeSection = ({...props}) => {
    return (
        <section className={`${props.reversed ? 'md:flex-row-reverse' : 'md:flex-row'} p-12 gap-12 flex justify-around md:items-center flex-col text-zinc-900`}>
            <div>
                <h1 className="font-mono lg:text-7xl text-5xl font-bold">{props.title}</h1>
                <h3 className="font-mono lg:text-4xl text-3xl font-bold text-zinc-800 mt-6">
                    {props.subheading}
                </h3>

                <p className="font-mono text-zinc-600 lg:text-3xl text-2xl mt-6">{props.description}</p>

            </div>

            <img
                src={props.image}
                alt="title"
                className="lg:w-96 w-56 rounded-lg"
            />
        </section>
    );
};

export default HomeSection;