import Image from "next/image";
import { motion } from "framer-motion";
import { Carousel } from "../common/Carousel/Carousel";
import { BANNER_1_URL, BANNER_2_URL } from "@/constants/apiList";
export default function BannerCarousel() {
    return (
        <Carousel fade className="mb-4 banner-carousel">
            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={BANNER_1_URL}
                    alt="Banner 1"
                    width={1600}
                    height={400}
                    style={{ objectFit: "cover" }}
                    priority
                />
                <Carousel.Caption className="middle-caption">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-white fw-bold">Welcome to GreenKart</h3>
                        <p className="text-light">Discover plants that brighten your home</p>
                    </motion.div>
                </Carousel.Caption>
            </Carousel.Item>

            <Carousel.Item>
                <Image
                    className="d-block w-100"
                    src={BANNER_2_URL}
                    alt="Banner 2"
                    width={1600}
                    height={400}
                    style={{ objectFit: "cover" }}
                    priority
                />
                <Carousel.Caption className="middle-caption">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="fw-bold text-white">Fresh Arrivals Weekly</h3>
                        <p className="text-light">Grow your green collection</p>
                    </motion.div>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}
