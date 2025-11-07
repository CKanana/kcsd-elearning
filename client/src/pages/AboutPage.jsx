import React from 'react';
import { Linkedin, Quote, Heart, Zap, Award, Users, BookOpen, Laptop, Cog, Wrench, Hand, Megaphone, Cpu, Handshake, Briefcase } from 'lucide-react';
import HomepageHeader from '../components/common/HomepageHeader';
import Footer from '../components/common/Footer';
import styles from './AboutPage.module.css';

const teamMembers = [
  {
    name: 'Dr Charles Ngiela',
    role: 'Executive Director',
  image: '/assets/images/Dr-Okello-Director.jpg',
    bio: 'Founder and Executive Director of KCSD. Passionate about inclusive education and sign-language access, Dr Ngiela leads KCSD’s programmes to empower deaf children and women through education, rehabilitation, and community outreach. Contact: kenyachristianschoolforthedeaf@yahoo.com',
  linkedin: 'https://www.linkedin.com/in/dr-charles-ngiela-50651576/?original_referer=https%3A%2F%2Fwww%2Egoogle%2Ecom%2F&originalSubdomain=ke',
    extra: 'sportanddev +1'
  },
  {
    name: 'Lavender A. Okello',
    role: 'Programme Manager',
  image: '/assets/images/Lavender-Owuor-Manager.jpg',
  bio: 'Programme/Operations manager at KCSD. Coordinates outreach, donor reporting and the delivery of learning and rehabilitation services for deaf children and women.',
    linkedin: '',
    extra: 'GlobalGiving'
  }
  ,
  {
    name: 'Gloria Catolico',
    role: 'Economist Strategist',
    image: '/assets/images/Gloria.jpg', // Placeholder image path
    bio: 'Ensures strategic direction and financial planning for the organization.',
    linkedin: '' // No LinkedIn provided
  }
  ,
  {
    name: 'Rachael Ulira',
    role: 'Marketing Manager',
    image: '/assets/images/Racheal.jpg', // Placeholder image path
    bio: 'Manages marketing strategies and outreach to promote KCSD\'s mission and programs.',
    linkedin: '' // No LinkedIn provided
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
              <h3>🌟 Empowering Every Child to Thrive</h3>
              <p>
                Kenya Christian School for the Deaf (KCSD) is a trailblazing e-learning institution dedicated to transforming the lives of children with hearing impairments and autism. Our mission is to provide a nurturing, faith-based educational experience that equips every deaf, hard-of-hearing, and autistic learner with the academic foundation, life skills, and confidence to flourish.
              </p>
              <h3>💡 Inclusive Learning for Unique Minds</h3>
              <p>
                KCSD was founded to meet the diverse needs of children who learn differently. We embrace each child's individuality, creating a safe and inclusive environment where they can grow intellectually, socially, and emotionally. Our curriculum is tailored to support both deaf and autistic learners, integrating visual learning, structured routines, and sensory-friendly approaches.
              </p>
              <h3>Innovating Through Technology and Communication</h3>
              <p>
                We are leaders in assistive technology and accessible digital content, ensuring that every child has the tools they need to succeed. From early sign language acquisition to interactive learning platforms, our programs are designed to foster communication, independence, and self-expression.
              </p>
              <h3> Building a Community of Support</h3>
              <p>
                At KCSD, education goes beyond the classroom. We work closely with families, caregivers, and specialists to provide holistic guidance and support. Together, we champion the potential of every child. celebrating their strengths and helping them overcome challenges with compassion and care.
              </p>
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