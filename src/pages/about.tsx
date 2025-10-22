import MainLayout from "@/components/layouts";

interface AboutProps {
    content: {
        title: string;
        sections: string[];
    };
}

export async function getStaticProps() {
    return {
        props: {
            content: {
                title: "🌱 About Us",
                sections: [
                    "Welcome to GreenKart",
                    "Your one-stop destination for smart, secure, and seamless online shopping. We bring you a wide range of quality products from trusted brands - all at your fingertips. At GreenKart, we believe shopping should be easy, enjoyable, and affordable. Whether you are looking for the latest electronics, trendy fashion, home essentials, or unique gifts, we have got something special for everyone.",
                    "Founded with a passion for innovation and customer satisfaction, GreenKart App started as a small idea to simplify how people shop online. What began as a small local project has now grown into a trusted online marketplace that connects customers with the best products and sellers across India.",
                    "Our journey has been powered by technology, transparency, and trust - the three pillars that define everything we do."
                ]
            }
        }
    };
}

export default function AboutPage({ content }: AboutProps) {
    return (
        <MainLayout title="About">
            <h2 className="text-center fw-bold text-success mb-5">
                {content.title}
            </h2>
            {content.sections.map((section, idx) => (
                <p key={idx}>{section}</p>
            ))}
        </MainLayout>
    );
}
