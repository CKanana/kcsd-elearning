import React from 'react';
import { Linkedin, Quote, Heart, Zap, Award, Users, BookOpen, Laptop, Cog, Wrench, Hand, Megaphone, Cpu, Handshake, Briefcase } from 'lucide-react';
import HomepageHeader from '../components/common/HomepageHeader';
import Footer from '../components/common/Footer';
import styles from './AboutPage.module.css';

const teamMembers = [
  {
    name: 'Dr. Evelyn Wanjiku',
    role: 'Founder & Director',
    image: '/assets/images/founder.jpg',
    bio: 'With over 20 years in special needs education, Dr. Wanjiku founded KCSD to create a world of opportunity for every deaf child.',
    linkedin: 'https://linkedin.com/in/evelynwanjiku'
  },
  {
    name: 'Samuel Kiprop',
    role: 'Head of Curriculum',
    image: '/assets/images/teacher-1.jpg',
    bio: 'Samuel is a KSL specialist who designs our innovative curriculum to be engaging, accessible, and effective for all learners.',
    linkedin: 'https://linkedin.com/in/samuelkiprop'
  },
  {
    name: 'Grace Adhiambo',
    role: 'Lead Vocational Trainer',
    image: '/assets/images/teacher-2.jpg',
    bio: 'Grace empowers our students with practical skills, preparing them for independent and successful futures in various trades.',
    linkedin: 'https://linkedin.com/in/graceadhiambo'
  }
];

const testimonials = [
  {
    quote: "KCSD has been a blessing for our family. Our son is not only learning but thriving in a community that understands and supports him. The teachers are incredibly dedicated.",
    author: "Mary A., Parent",
    image: "/assets/images/parent-1.jpg"
  },
  {
    quote: "I love my school! I have learned so much, especially in vocational training. I feel prepared for the future and have made friends for life.",
    author: "David O., Student",
    image: "/assets/images/student-1.jpg"
  },
  {
    quote: "Supporting KCSD has been one of the most rewarding experiences. Seeing the direct impact of their work on the children's lives is truly inspiring.",
    author: "John K., Community Partner",
    image: "/assets/images/partner-1.jpg"
  }
];

const coreValues = [
  { icon: Heart, title: "Inclusion", text: "Promoting equality and access to education for all learners." },
  { icon: Zap, title: "Empowerment", text: "Equipping students with skills for independence and self-advocacy." },
  { icon: Award, title: "Excellence", text: "Delivering quality education and fostering lifelong learning." },
  { icon: Users, title: "Community", text: "Building partnerships with families, educators, and society to support student growth." }
];

const programs = [
  { icon: BookOpen, title: "Academic Education", text: "A robust curriculum tailored for deaf learners, with specialized instruction in Kenyan Sign Language (KSL)." },
  { icon: Laptop, title: "E-Learning & ICT", text: "Online sign language training programs for both adults and children, with elementary courses guided by subject teachers." },
  { icon: Cog, title: "Assistive Technology", text: "Development of assistive devices and digital content supporting early sign language acquisition for deaf children aged 1–7." },
  { icon: Wrench, title: "Vocational Training", text: "Hands-on training to prepare students for careers and self-reliance." },
  { icon: Hand, title: "Spiritual Development", text: "Christian-based teaching to nurture moral and ethical values." },
  { icon: Users, title: "Parental Support", text: "Workshops and resources to strengthen families’ ability to support their children." },
  { icon: Megaphone, title: "Advocacy & Awareness", text: "Promoting inclusion and understanding of deaf individuals through community outreach." }
];

const futureGoals = [
  {
    icon: Users,
    text: 'Expand access by increasing enrollment capacity.'
  },
  {
    icon: Cpu,
    text: 'Develop advanced assistive technologies and digital learning tools.'
  },
  {
    icon: Handshake,
    text: 'Strengthen partnerships to influence inclusive education policy.'
  },
  {
    icon: Briefcase,
    text: 'Launch post-graduation programs for job placement and mentorship.'
  }
];

const AboutPage = () => {
  return (
    <div className={styles.page}>
      <HomepageHeader />
      <main className={styles.main}>
        <div className={styles.pageHeader}>
          <div className={styles.container}>
            <h1 className={styles.pageTitle}>About KCSD</h1>
            <p className={styles.pageSubtitle}>
              Empowering Deaf Children Through Education, Innovation & Inclusion
            </p>
          </div>
        </div>

        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.grid2}>
              <div className={styles.aboutCardGlass}>
                <h3 className={styles.missionVisionTitle}>Our Mission</h3>
                <p className={styles.missionVisionText}>
                  To provide high-quality, accessible, and inclusive education for deaf and hard-of-hearing children, equipping them with the knowledge, skills, and values to lead meaningful and independent lives.
                </p>
              </div>
              <div className={styles.aboutCardGlass}>
                <h3 className={styles.missionVisionTitle}>Our Vision</h3>
                <p className={styles.missionVisionText}>
                  A world where every child, regardless of hearing ability, achieves their full potential in a supportive and inclusive community.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Journey</h2>
            <div className={styles.storyContent}>
              <p>Founded to meet the unique needs of deaf learners, KCSD fosters an inclusive environment where children excel academically and socially. We also lead innovation in assistive technology and digital content, supporting early sign language acquisition to give every child the tools they need to succeed.</p>
              <p>Since its establishment, KCSD has transformed the lives of countless deaf children, breaking barriers to education and opportunity. By creating a culture of inclusion and innovation, the school has become a beacon of hope for families across Kenya.</p>
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.lightBackground}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Core Values</h2>
            <div className={styles.grid4}>
              {coreValues.map((value, index) => (
                <div key={index} className={styles.valueCard}>
                  <div className={styles.valueIconWrapper}>
                    <value.icon size={32} />
                  </div>
                  <h4 className={styles.valueTitle}>{value.title}</h4>
                  <p className={styles.valueText}>{value.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.section}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Programs & Services</h2>
            <div className={styles.grid3}>
              {programs.map((program, index) => (
                <div key={index} className={styles.programCard}>
                  <div className={styles.programIconWrapper}><program.icon size={28} /></div>
                  <h4 className={styles.programTitle}>{program.title}</h4>
                  <p className={styles.programText}>{program.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.lightBackground}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Our Vision for the Future</h2>
            <div className={styles.grid2}>
              {futureGoals.map((goal, index) => (
                <div key={index} className={styles.goalCard}>
                  <div className={styles.goalIconWrapper}>
                    <goal.icon size={24} />
                  </div>
                  <p>{goal.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.teamSectionBackground}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>Meet Our Team</h2>
            <div className={styles.grid3}>
              {teamMembers.map((member, index) => (
                <div key={index} className={styles.teamCard}>
                  <img src={member.image} alt={member.name} className={styles.teamImage} />
                  <h4 className={styles.teamName}>{member.name}</h4>
                  <p className={styles.teamRole}>{member.role}</p>
                  <p className={styles.teamBio}>{member.bio}</p>
                  <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className={styles.teamSocialLink}>
                    <Linkedin size={20} />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${styles.section} ${styles.testimonialSection}`}>
          <div className={styles.container}>
            <h2 className={styles.sectionTitle}>What Our Community Says</h2>
            <div className={styles.grid3}>
              {testimonials.map((testimonial, index) => (
                <div key={index} className={styles.testimonialCard}>
                  <Quote className={styles.quoteIcon} size={40} />
                  <p className={styles.testimonialText}>"{testimonial.quote}"</p>
                  <div className={styles.testimonialAuthorInfo}>
                    <img src={testimonial.image} alt={testimonial.author} className={styles.testimonialImage} />
                    <span className={styles.testimonialAuthor}>{testimonial.author}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;