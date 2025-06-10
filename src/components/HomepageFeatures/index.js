import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'La Rochelle Université',
    Svg: require('@site/static/img/LaRochelleUniversité.svg').default,
    description: (
      <>
        Où je suis actuellement en Bachelor Universitaire de Technologie Informatique en deuxième année.
      </>
    ),
  },
  {
    title: 'Elio',
    Svg: require('@site/static/img/ELIO.svg').default,
    description: (
      <>
        L'entreprise où je suis en alternance en tant que développeur.
      </>
    ),
  },
  {
    title: 'NiortTech',
    Svg: require('@site/static/img/img-01.svg').default,
    description: (
      <>
        Le lieu accueillant mon entreprise mais aussi ma formation.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
	  <div className="container">
		<div className="row">
		  {FeatureList.map((props, idx) => (
			<Feature key={idx} {...props} />
		  ))}
		</div>
	  </div>
	</section>
  );
}
