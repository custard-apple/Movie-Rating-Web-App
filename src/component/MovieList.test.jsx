import { render, screen, fireEvent } from "@testing-library/react";
import MovieList from "./MovieList";

const mockMovies = [
    { title: "A New Hope", episode_id: 4, release_date: "1977-05-25" },
    { title: "The Empire Strikes Back", episode_id: 5, release_date: "1980-05-21" },
];

describe("MovieList Component", () => {
    it("renders the movie list", () => {
        render(<MovieList movieList={mockMovies} showMovieDetails={jest.fn()} />);
        const movieItems = screen.getAllByTestId("movie-item");

        expect(movieItems.length).toBe(2);
        expect(movieItems[0]).toHaveTextContent("A New Hope");
        expect(movieItems[1]).toHaveTextContent("The Empire Strikes Back");
    });

    it("calls onSelectMovie when a movie is clicked", () => {
        const mockSelectMovie = jest.fn();
        render(<MovieList movieList={mockMovies} showMovieDetails={mockSelectMovie} />);
        const firstMovie = screen.getByText("A New Hope");
        fireEvent.click(firstMovie);

        expect(mockSelectMovie).toHaveBeenCalledWith("A New Hope");
    });
});