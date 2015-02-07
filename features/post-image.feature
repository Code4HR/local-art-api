# lang: en
Feature: Image POST Route
    In order to provide a photo of public art
    As a citizen
    I want to send images

    Scenario: Post an image
        When I send a post request with an image and an OpenStreetMap node number
        And I send a get request for that node number
        Then I should receive a picture
