import { useState } from "react";
import { Container, VStack, Heading, Input, Textarea, Button, Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = () => {
    const newPost = { title, content, image };
    const existingPosts = JSON.parse(localStorage.getItem("posts")) || [];
    localStorage.setItem("posts", JSON.stringify([...existingPosts, newPost]));
    navigate("/");
  };

  return (
    <Container centerContent maxW="container.md" mt={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Create a New Post</Heading>
        <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
        <Input type="file" accept="image/*" onChange={handleImageChange} />
        {image && <Image src={image} alt="Selected" boxSize="sm" />}
        <Button colorScheme="teal" onClick={handleSubmit}>Submit</Button>
      </VStack>
    </Container>
  );
};

export default NewPost;