import { render, screen } from "@testing-library/react";
import MovieDetails from "./MovieDetails";

const mockMovie = {
    Title: "A New Hope",
    Poster: "https://m.media-amazon.com/images/M/MV5BNDg0ZjkxNTUtMTliNy00NTdlLTg3M2ItOTdmMzYyNTdhMGYwXkEyXkFqcGdeQXVyMTM0MDA5ODk0._V1_SX300.jpg",
    Director: "George Lucas",
    Plot: "After rescuing Han Solo from Jabba the Hutt, the Rebel Alliance attempts to destroy the second Death Star while Luke struggles to help Darth Vader back from the",
    Ratings: [
        {
            "Source": "Internet Movie Database",
            "Value": "8.3/10"
        },
        {
            "Source": "Rotten Tomatoes",
            "Value": "82%"
        },
        {
            "Source": "Metacritic",
            "Value": "58/100"
        }
    ]
};

describe("MovieDetail Component", () => {
    it("renders default text when no movie is selected", () => {
        render(<MovieDetails movie={null} isLoading={false} />);
        expect(screen.getByText("No Movie selected!")).toBeInTheDocument();
    });

    it("renders movie details when a movie is selected", () => {
        render(<MovieDetails movie={mockMovie} isLoading={false} />);
        expect(screen.getByText("A New Hope")).toBeInTheDocument();
        expect(screen.getByText("Directed By : George Lucas")).toBeInTheDocument();
    });
});